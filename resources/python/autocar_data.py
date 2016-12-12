import urllib.request
from bs4 import BeautifulSoup

z = ['A', 'B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M',
     'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z']

carlist = {
    'A': [],
    'B': [],
    'C': [],
    'D': [],
    'F': [],
    'G': [],
    'H': [],
    'J': [],
    'K': [],
    'L': [],
    'M': [],
    'N': [],
    'O': [],
    'P': [],
    'Q': [],
    'R': [],
    'S': [],
    'T': [],
    'W': [],
    'X': [],
    'Y': [],
    'Z': []
}

with open('autoname.txt', 'w') as f:
    for word in z:
        url = 'http://www.autohome.com.cn/grade/carhtml/' + word + '.html'
        req = urllib.request.Request(url, headers={
            'Connection': 'Keep-Alive',
            'Accept': 'text/html, application/xhtml+xml, */*',
            'Accept-Language': 'en-US,en;q=0.8,zh-Hans-CN;q=0.5,zh-Hans;q=0.3',
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; rv:11.0) like Gecko'
        })
        oper = urllib.request.urlopen(req)
        data = oper.read().decode('gb2312')

        soup = BeautifulSoup(data)
        for carname in soup.find_all("dt"):
            name = carname.div.a.string
            img_src = carname.a.img['src']
            carItem = {'name': name, 'img_src': img_src}
            carlist[word].append(carItem)
        f.write(word + ':' + str(carlist[word]) + ',\n')
