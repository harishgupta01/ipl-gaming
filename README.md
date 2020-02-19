# Signup

Used to signup a new user.

**URL** : `/api/user/signup`

**Method** : `POST`

**Auth required** : NO

**Data constraints**

```form
email=<>&password=<>&name=<>
```

**Data example**

```form
email=test@test1.com&password=test&name=Test
```

## Success Response

**Code** : `200 OK`

**Content example (JWT)**

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZTE4OWViMzg2NGRhMzAwMDQ5ZTZjZjkiLCJpYXQiOjE1Nzg2NzE3OTV9.YLY-0uMFbfQJ2shiqrm5ODPgLw-xfh6T_5Kw4uk_9GI

```

## Error Response

**Condition** : If 'username' and 'password' combination is wrong.

**Code** : `401 Unauthorized`


# Login

Used for user login.

**URL** : `/api/user/login`

**Method** : `POST`

**Auth required** : NO

**Data constraints**

```form
email=<>&password=<>
```

**Data example**

```form
email=test@test1.com&password=test
```

## Success Response

**Code** : `200 OK`

**Content example (JWT)**

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZTE4OWViMzg2NGRhMzAwMDQ5ZTZjZjkiLCJpYXQiOjE1Nzg2NzE3OTV9.YLY-0uMFbfQJ2shiqrm5ODPgLw-xfh6T_5Kw4uk_9GI

```

## Error Response

**Condition** : If 'username' and 'password' combination is wrong.

**Code** : `401 Unauthorized`

**Content example**

```json
{
    "message":"user not found"
}

```


# List of current bets

Used to get the list of current bets.

**URL** : `/api/user/betlist`

**Method** : `GET`

**Auth required** : No, if cookie is honored. Else `Authorization: Bearer <token>` is required


## Success Response

**Code** : `200 OK`

**Content example **

```json
[{"_id":"5e2082714518353a5ce96411","id":"301","name":"Test1vsTest2","DateFrom":"2020-01-09T14:00:00.000Z","DateTo":"2020-01-30T14:00:00.000Z"},{"_id":"5e2082714518353a5ce96412","id":"302","name":"Test3vsTest4","DateFrom":"2020-01-10T14:00:00.000Z","DateTo":"2020-01-30T14:00:00.000Z"},{"_id":"5e2082724518353a5ce96413","id":"303","name":"Test5vsTest6","DateFrom":"2020-01-10T14:00:00.000Z","DateTo":"2020-01-30T14:00:00.000Z"}]
```

## Error Response

**Condition** : If token is invalid or nothing is found.

**Code** : `403 Forbidden`

**Content example**

```json
{"error":"bet list not found"}

```

# Count of current bets

Used to get the count of current bets.

**URL** : `/api/user/getbetcount`

**Method** : `POST`

**Auth required** : No, if cookie is honored. Else `Authorization: Bearer <token>` is required

**Data constraints**

```form
name=<betname>
```

**Data example**

```form
name=Test1vsTest2
```

## Success Response

**Code** : `200 OK`

**Content example **

```json
[{"_id":"5e208114a017ad13a3d9e3f9","name":"test"}]
```

## Error Response

**Condition** : If token is invalid or nothing is found.

**Code** : `403 Forbidden`

**Content example**

```json
{"error":"bet list not found"}

```

# Save a bet for a given user

Used to post/save a bet or more.

**URL** : `/api/user/save`

**Method** : `POST`

**Auth required** : No, if cookie is honored. Else `Authorization: Bearer <token>` is required

**Data constraints**

```form
<betname>=<bet>
```

**Data example**

```form
Test1vsTest2=Test2&Test3vsTest4=Test4&Test5vsTest6=Test6
```

## Success Response

**Code** : `200 OK`

**Content example ** None


## Error Response

**Condition** : If token is invalid or nothing is found.

**Code** : `403 Forbidden`

**Content example**

```json
{"error":"Bet already exists"}

```

# Get the history of bets

Used to post/save a bet or more.

**URL** : `/api/user/getbets`

**Method** : `GET`

**Auth required** : No, if cookie is honored. Else `Authorization: Bearer <token>` is required

## Success Response

**Code** : `200 OK`

**Content example ** None

```json
{"Test6vsTest7":[{"name":"1","betname":"Test6vsTest7","bet":"Test7"}]}
```

## Error Response

**Condition** : If token is invalid or nothing is found.

**Code** : `403 Forbidden`

**Content example**

```json
{"error":"bet list not found"}

```
