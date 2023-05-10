Ubuntu 20.04 LTS 환경설정

ddns
kshnx2.iptime.org

port
22 : ssl, sftp
8080 : tomcat
3000 : react
3306 : mariadb
5000 : flask
30000 : 공유기설정

#Python
- 우분투에서 지원하는 파이썬 버전은 3.8이나 - yolov5를 위해 3.10.10으로 업그레이드 
- linux ver pytourch 설치
- pip3.10 설치
#Python 문제
- python 내장 flask로는 정상동작 확인하였으나 외부 flask 사용시 에러발생
- 현재 yolov5 설치 및 flask사용에 문제발생(해결중)

#JAVA
- openJDK 1.8

#SpringBoot
- 2.7.11 버전으로 진행하였으나 포팅되지않아 2.7.7로 다운그레이드
- springsecurity 개발중

