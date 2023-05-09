# bottle-project
K-digital-02 bottle identification project

# You should read it first...

## 구조
- DA, 데이터 분석 관련
- FE, 사용자 입력 및 시각화 관련
- BE, 인증 및 권한과 API 관련

# 실행
1. DA 서비스 실행
```
$ python app.py
```

2. BE 서비스 실행



3. FE 서비스 실행



- DA, 'localhost 5000/api/prediction'
    - http 중에서 POST만 제공
- BE, 'localhost:8080/api/...'
    - 권한(profile)
    - 인증(login)
    - API(user, history)
    - (기타 추가할 내용은 BE가 채우기)
- FE, 'localhost:3000'
    - index.html이 스프링이어야 한다.

4.개발환경
- python 3.10.10 (YOLOV5 호환)
- springboot 2.7.7 (ubuntu server 호환)
- openjdk8

