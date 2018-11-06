import tweepy
import sys
import getopt
import nltk
from watson_developer_cloud import NaturalLanguageUnderstandingV1
import json
from watson_developer_cloud.natural_language_understanding_v1 import Features, EntitiesOptions, KeywordsOptions, ConceptsOptions, EmotionOptions, SentimentOptions, CategoriesOptions
import re
import util
import sys

consumer_key = ""
consumer_secret = ""

api_token = ""
api_secret = ""

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(api_token, api_secret)

api = tweepy.API(auth)
user_id = "@GeorgiaTech"
try:
    user_id = sys.argv[1]
except:
    pass
public_tweets = api.user_timeline(user_id, count = 20)

natural_language_understanding = NaturalLanguageUnderstandingV1(
    version='2018-03-16',
    iam_apikey='',
    url=''
)
concepts_dict = {}
categories_dict = {}
emotion_dict = {}
entities_dict = {}
keywords_dict = {}
sentiments_list = []
colleges_dict = {}


def add_to_concepts(concepts):
    for concept in concepts:
        text = concept["text"]
        relevance = concept["relevance"]
        if text not in concepts_dict:
            concepts_dict[text] = 0
        concepts_dict[text] += relevance

def add_to_categories(categories):
    for category in categories:
        label = category["label"]
        if label == "/technology and computing/internet technology/email":
            continue
        # label = label.split("/")
        # parent = label[0]
        # child = label[1]
        score = category["score"]
        if label not in categories_dict:
            categories_dict[label] = 0
        # if child not in categories_dict[parent]:
        #     categories_dict[parent][child] = 0
        categories_dict[label] += score

def add_to_emotion(emotions):
    for emotion in emotions:
        old = emotion_dict.get(emotion,0)
        emotion_dict[emotion] = old + emotions[emotion]

def add_to_entities(entities):
    for entity in entities:
        if 'disambiguation' in entity and 'subtype' in entity['disambiguation'] and 'University' in entity['disambiguation']['subtype']:
            text = entity['disambiguation']['name']
            old = colleges_dict.get(text, 0)
            colleges_dict[text] = old + (entity['relevance'] * entity['count'])
        else:
            text = entity["text"]
            old = entities_dict.get(text, 0)
            entities_dict[text] = old + (entity['relevance'] * entity['count'])

def add_to_keywords(keywords, document_score):
    for keyword in keywords:
        text = keyword["text"]
        old = keywords_dict.get(text, 0)
        keywords_dict[text] = old + (keyword['relevance'] * document_score)

def add_to_sentiment(sentiment):
    sentiments_list.append(sentiment["score"])

def get_top_n_dict(aDict, n):
    map = {}
    sortedList = sorted(aDict.items(), key=lambda x: x[1], reverse=True)
    ret = []
    for key, value in sortedList[:n]:
        ret.append(key)
        map[key] = value
    return ret

def get_top_n_keywords(keywords, n):
    good_words, bad_words = {}, {}
    sortedList = sorted(keywords.items(), key=lambda x: x[1], reverse=True)
    good, bad = [], []
    for key, value in sortedList[:n]:
        good_words[key] = value
        good.append(key)
    for key, value in sortedList[:-1*n-1:-1]:
        bad_words[key] = value
        bad.append(key)
    return good, bad

for tweet in public_tweets:
    tweet = tweet.text
    tweet = util.deEmojify(tweet)
    tweet = util.deLinkify(tweet)
    tweet = tweet.lower()
    if len(tweet) < 15:
        continue
    response = natural_language_understanding.analyze(
        text=tweet, language = 'en',
        features=Features(keywords=KeywordsOptions(), entities=EntitiesOptions(), concepts=ConceptsOptions(
        ), emotion=EmotionOptions(), sentiment=SentimentOptions(), categories=CategoriesOptions())
    ).get_result()
    add_to_concepts(response["concepts"])
    add_to_categories(response["categories"])
    add_to_emotion(response["emotion"]["document"]["emotion"])
    add_to_entities(response["entities"])
    add_to_keywords(response["keywords"], response["sentiment"]["document"]['score'])
    add_to_sentiment(response["sentiment"]["document"])

def normalize(dict):
    new_dict = {}
    m = max(dict.values())
    for k in dict:
        new_dict[k] = dict[k] / float(m)
        new_dict[k] = new_dict[k]*100
    return new_dict

all_dict = {}
all_dict["concepts"] = get_top_n_dict(concepts_dict, 3)
all_dict["categories"] = get_top_n_dict(categories_dict, 3)
all_dict["emotions"] = normalize(emotion_dict)
all_dict["entities"] = get_top_n_dict(entities_dict, 3)
good_keywords, bad_keywords = get_top_n_keywords(keywords_dict, 3)
all_dict["good_keywords"] = good_keywords
all_dict["bad_keywords"] = bad_keywords
all_dict["sentiments"] = sentiments_list
all_dict["colleges"] = get_top_n_dict(colleges_dict, 3)
sent_dict = {'Good': 0, 'Bad': 0, 'Neutral': 0}
sent_aranges = {}
sent_aranges['points'] = []
all_dict['score'] = int((sum(sentiments_list)/float(len(sentiments_list)))*100)
for i in range(len(sentiments_list)):
    j = sentiments_list[i]
    if j < 0:
        sent_dict['Bad'] += 1
    elif j > 0:
        sent_dict['Good'] += 1
    else:
        sent_dict['Neutral'] += 1

    dict = {}
    dict['x'] = i + 1
    dict['y'] = sentiments_list[i]
    sent_aranges['points'].append(dict)

sent_good_list = []
for k in sent_dict:
    new_dict = {}
    new_dict['name'] = k
    new_dict['value'] = sent_dict[k]
    sent_good_list.append(new_dict)

all_dict["sentiment_dict"] = sent_good_list
all_dict["sent_aranges"] = sent_aranges
with open('data.json', 'w') as outfile:
    json.dump(all_dict, outfile)

print("Done")
