Sandeep Here's 

lightmedia have basic user,admin,role curd (get,put,post,delete)

for-setup follow below setup 

1) run npm i 
2) add data base url in config/default.json file
3) npm run start
4) hit this url http://localhost:8000/specs 


#Permission logic For admin's

first create role with permission using create role api ,this api give you resposne 

like below

{
  "isSuccess": true,
  "statusCode": 200,
  "data": {
    "permissions": {
      "view": true,
      "add": false,
      "edit": true,
      "delete": false,
      "all": false
    },
    "type": "admin",
    "_id": "5ff070dc46cd9857c4204711",
    "createdOn": "2021-01-02T13:10:52.644Z",
    "updatedOn": "2021-01-02T13:10:52.680Z",
    "__v": 0
  },
  "message": "role created Successfully"
}

#Check permission

NOTE:-

please use below keyword for admin role 

1)superAdmin
2)admin


and aslo maintain code structure

Thanks

