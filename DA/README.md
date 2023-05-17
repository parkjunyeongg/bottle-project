## 가상환경 및 yolov5 설치
파이썬 3.10.10버전 선행 설치 필수

Windows
```
cd DA
py -3.10 -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu117
```

Linux
```
pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu
```

test01.py -> 결과를 창에 띄움
test02.py -> 결과를 json에 실어서 보냄
