# App Demo

Hint: Toate paginile au o animatie atunci cand se incarca: apar de jos in sus + butonul din meniu pune un cerc in spatele paginii deschise

![selectRole](https://user-images.githubusercontent.com/53595545/167317214-ac9b6fdb-18ad-4b5b-84de-86dea65727ca.jpeg)
## INSERT user
![signup](https://user-images.githubusercontent.com/53595545/167317216-70d124ab-81c6-4e9c-8be8-d1280d102213.jpeg)

## SELECT user by id
![login](https://user-images.githubusercontent.com/53595545/167317220-9e317ac1-f582-45fd-bd64-59eaaf0c571c.jpeg)

## REQUEST la 2 API-uri pentru obtinerea colectiilor + numele acestora
![dashboard](https://user-images.githubusercontent.com/53595545/167317225-7e1b7808-c404-4f03-849c-3df28fc8d5f7.jpeg)

## REQUEST la 1 API pentru a obtine NFT-urile dintr-o colectie
![viewCollection](https://user-images.githubusercontent.com/53595545/167317237-81115705-833a-4595-b8bb-3bd364a28f7f.jpeg)
![viewNft](https://user-images.githubusercontent.com/53595545/167317238-5ab5f852-3242-4dac-99fc-a8a53ac92af5.jpeg)

## BONUS: Generare de QR
![generateQR](https://user-images.githubusercontent.com/53595545/167317239-2fc0c5a0-edaa-4195-a8df-11c2b89548fb.jpeg)

![wallets](https://user-images.githubusercontent.com/53595545/167317228-4f4dbe92-02de-43ae-986f-6d5431d6db00.jpeg)
## Animatie de Popup
![deleteWallet](https://user-images.githubusercontent.com/53595545/167317265-193894ea-dbf3-42a7-a5f9-64ffd218f36b.jpeg)

## DELETE user si UPDATE email
![profile](https://user-images.githubusercontent.com/53595545/167317231-78566a77-895d-497c-8619-6b0ae19ce67f.jpeg)



# Development Setup

## Backend API (Django)

Create virtual environment in repo (make sure you have python installed):
```bash
python -m venv venv
```

Activate venv:
```bash
venv\Scripts\activate
```

Install dependencies:
```bash
pip install -r requirements.txt
```

To create database tables
```bash
python manage.py makemigrations NFTValidationApp
```

To migrate the changes form model to database 
```bash
python manage.py migrate NFTValidationApp
```

Open a cmd > ipconfig > copy the IPv4 Address

Go to: React\Mobile\context\app.context.js on line 31 and change the line to
```bash
const [API_URL, SET_API_URL] = useState("http://< IPv4 Address >:8000");
```

Go to: DjangoAPI\DjangoAPI\settings.py on line 29 and change the line to
```bash
ALLOWED_HOSTS = [< IPv4 Address >]
```

To run the API:
```bash
cd DjangoAPI
python manage.py runserver <IPv4 Address>:8000
```

To access the server: 
```bash
<IPv4 Address>:8000
```


## Frontend (React)

Install packages:
```bash
npm install
```

Start project:
```bash
npm start
```

## Additional programs

To see the database install: [SQLiteStudio](https://sqlitestudio.pl/)
