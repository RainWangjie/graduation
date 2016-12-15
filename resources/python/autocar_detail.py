import urllib.request
from bs4 import BeautifulSoup

z = ['A', 'B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M',
     'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z']

# test
# z = ['A']

car_detail = {}

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
    for carname in soup.find_all("dl"):
        name = carname.dt.div.a.string
        carlist_temp = {}
        carname_itemlist = carname.find_all(class_='h3-tit')
        i = 0
        for carItem in carname.find_all(class_='rank-list-ul'):
            name_tit = carname_itemlist[i].string
            i = i + 1
            temp_list = []
            for item in carItem.find_all('li'):
                if item.get('class') != ['dashline']:
                    _name = item.h4.a.string
                    _price = '暂无'
                    if item.select('.red')!= []:
                        _price = item.find_all(class_='red')[0].string
                    temp_d = {'price': _price, 'name': _name}
                    temp_list.append(temp_d)
            carlist_temp[name_tit] = temp_list
        car_detail[name] = carlist_temp
    # print(car_detail)
with open('autocar_detail.txt', 'w') as f:    
    f.write(str(car_detail))
