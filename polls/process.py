import requests
import xml.etree.ElementTree as ET


def processSentence(text):
    #print(text)
    #text=text.rstrip('\r\n')
    #print(text)
    payload = {'text': text, 'language': 'en-US'}
    r = requests.get("https://languagetool.org:8081", params=payload)

    print(r.text)
    root = ET.fromstring(r.text)

    for child in root:
        if child.tag == 'error':
            if child.attrib['locqualityissuetype'] == 'misspelling':
                length = child.attrib['errorlength']
                currX = int(child.attrib['fromx'])
                destX = int(child.attrib['tox'])
                currY = int(child.attrib['fromy'])
                destY = int(child.attrib['toy'])
                replace = child.attrib['replacements']

                for i in range(0, currY):
                    currX+=payload['text'].find('\n', currX)+1
                for i in range(0, destY):
                    destX+=payload['text'].find('\n', destX)+1
                if '#' in replace:
                    replace = replace[:replace.index('#')]
                payload['text'] = payload['text'][:currX] + replace + payload['text'][destX:]

    r = requests.get("https://languagetool.org:8081", params=payload)

    root = ET.fromstring(r.text)

    for child in root:
        if child.tag == 'error':
            length = child.attrib['errorlength']
            currX = int(child.attrib['fromx'])
            destX = int(child.attrib['tox'])
            currY = int(child.attrib['fromy'])
            destY = int(child.attrib['toy'])
            replace = child.attrib['replacements']
            # old = payload['text'][currX:destX]

            for i in range(0, currY):
                currX+=payload['text'].find('\n', currX)+1
                print(currX)
            for i in range(0, destY):
                destX+=payload['text'].find('\n', destX)+1
                print(destX)
            print(replace)
            if '#' in replace:
                replace = replace[:replace.index('#')]
            print(currX)
            print(destX)
            print(replace)
            payload['text'] = payload['text'][:currX] + replace + payload['text'][destX:]

    return payload['text']