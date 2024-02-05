***Welcome to my File Manager***

to start the program type: ```npm run start -- --username=your_username ``` in your terminal

i.e. ```npm run start -- --username=John``` and you'll get ```Welcome to the File Manager, John!``` in your console. 

If you don't provide a name, you'll get ```Welcome to the File Manager, Stranger!```

To exit the program press ctrl + C on Windows or cmd + C on Mac. Or type ```.exit``` in your terminal

Most of the commands work as you would expect them to, and you can find examples in https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/file-manager/assignment.md however, some of them need explanation.

Don't worry if you make a typo or a mistake, the program mostly covered by hints to help you navigate within the program.


**Compress and decompress operations**

Compress file (using Brotli algorithm, should be done using Streams API)

```compress path_to_file path_to_destination```

i.e. ```compress text.txt ./ -> text.txt.br```
if you provide a '.br' extention be carefull. you need to have the save the original file extention or the data will be lost
i.e. ```compress text.txt text.txt.br -> text.txt.br```

Decompress file (using Brotli algorithm, should be done using Streams API)

```decompress path_to_file path_to_destination```

i.e. ```decompress text.br ./ -> text.txt```

