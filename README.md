# 短網址產生器
![image](https://github.com/dingbum73/urlShortener/assets/124600894/839df6f4-7dd9-4711-a9bc-d828ed1cca8b)

## 介紹
在畫面上輸入想縮短的網址，會回傳縮短網址出來

## 開始使用
1. 先確認本機已安裝node.js與npm
2. 將專案複製到本機
3. 開啟終端機進入專案資料夾，輸入以下指令：   
 ```npm install ```
4. 下載專案所需的套件(可參閱開發工具)
5. 準備MongoDB，並建立.env檔案，輸入以下文字：  
```MONGODB_URI=mongodb+srv://{帳號}:{密碼}@cluster0.0zausae.mongodb.net/```
6. 安裝完畢後，輸入以下指令：  
``` npm run dev ```
7. 看到以下文字，即可打開瀏覽器輸入網址  
```It's running on http://localhost:3000  DB connected! ```
8. 停止專案，輸入以下指令：  
```ctrl + c```

## 開發工具
-Node 18.16.0  
-Express 4.18.2  
-Express-handlebars 7.0.7  
-Boostrap 5.3.0  
-MongoDB  
-mongoose: 7.3.1
