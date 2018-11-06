import re

def deEmojify(inputString):
     returnString = ""
     for character in inputString:
         try:
             character.encode("ascii")
             returnString += character
         except UnicodeEncodeError:
             returnString += ''
     return returnString

def deLinkify(inputString):
    final = ""
    for word in inputString.split():
        if 'http' not in word:
            final = final + " " + word
    final = final.strip()
    return final
