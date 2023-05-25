# bottle-project
K-digital-02 bottle identification project

# You should read it first...

1. 병 판별 데이터 분석 및 웹 서비스 구축 기획안 : https://docs.google.com/document/d/1MNx_ZBxme7EzghV2o5YCM3HD9PrhmfMrc4ZL8C719ng/edit?usp=sharing

2. 병 판별 데이터 분석 및 웹 서비스 설계서 : https://docs.google.com/document/d/14qFV3krXvY4FhIDjSZQOsbOTRWI3e4PTBu73TSYKZlU/edit?usp=sharing

3. 병 판별 데이터 분석 및 웹 서비스 화면 상세 설계서 : https://docs.google.com/document/d/1CUiWeUYGTQhbvvTxv4pECfqIYupVd3BeXT3IinvuzUI/edit#heading=h.1sbrum4kcsjp

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
- FE, 'localhost:3000'
    - index.html이 스프링이어야 한다.

4. 개발환경
    - python 3.10.10 (YOLOV5 호환)
    - springboot 2.7.7 (ubuntu server 호환)
    - openjdk8

