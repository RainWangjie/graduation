import urllib.request
from bs4 import BeautifulSoup

cardata = {}

url = 'http://car.m.autohome.com.cn'
req = urllib.request.Request(url, headers={
    'Connection': 'Keep-Alive',
    'Accept': 'text/html, application/xhtml+xml, */*',
    'Accept-Language': 'en-US,en;q=0.8,zh-Hans-CN;q=0.5,zh-Hans;q=0.3',
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; rv:11.0) like Gecko'
})
oper = urllib.request.urlopen(req)
data = oper.read().decode('UTF-8')

soup = BeautifulSoup(data, 'html.parser')
# 获取车辆列表
listBrand = soup.select('#div_ListBrand')[0]
for word in listBrand.find_all('h3'):
    word_string = word.string
    cardata[word_string] = []
    for car in word.next_sibling:
        car_name = car.strong.string
        car_img = ''
        if car.img.has_attr('data-src') :
            car_img = str(car.img['data-src'])
        else:
            car_img = str(car.img['src'])
        car_id = str(car['id'])[1:]
        cardata[word_string].append({
            'id': car_id,
            'name': car_name,
            'img_src': car_img
        })
with open('autoname.json', 'w') as f:
    f.write(str(cardata))