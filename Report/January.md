```dataview
TABLE filter( file.etags, (x) => !contains(x, "#breakfast🍳") AND !contains(x, "#dinner") ) as 아침
FROM #meal-log📝 

WHERE file.folder = "remoteBrain/Daily-Docs/2024/January"
```







