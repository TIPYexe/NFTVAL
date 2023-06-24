# NFTVAL | NFT Coupons

[![React Native](https://img.shields.io/badge/React%20Native-v0.64.2-blue.svg)](https://reactnative.dev/)
[![Django](https://img.shields.io/badge/Django-v3.2.6-green.svg)](https://www.djangoproject.com/)

Welcome to my super innovative project, the NFT Discount Coupons App! 🎉📱💰

Have you ever wondered how to revolutionize the way physical and online stores offer discounts? Well, this app is here to shake things up! With this system, stores can now use Non-Fungible Tokens (NFTs) as unique discount coupons, combining the power of blockchain and React Native magic.

## Features

- Connect your real crypto wallets: Link your crypto wallets to the app and unleash the power of your digital assets.
- Browse and manage your NFT collection: Explore the NFTs you own, admire their beauty, and feel the excitement of being a true digital art connoisseur.
- Generate QR codes: Transform your NFTs into sleek and stylish QR codes, making them easily scannable at the store.
- Single-use NFTs: Each NFT serves as a single-use coupon, adding exclusivity and ensuring a unique customer experience.
- Seamless integration: The app seamlessly integrates React Native and Django, combining the power of frontend and backend technologies to create a robust and efficient system.

## INSERT user (Register)
<div>
  <img src="https://user-images.githubusercontent.com/53595545/167317216-70d124ab-81c6-4e9c-8be8-d1280d102213.jpeg" alt="signup" width="300">
</div>

## SELECT user by id (not enough time for a user-password Signup)
<div>
  <img src="https://user-images.githubusercontent.com/53595545/167317220-9e317ac1-f582-45fd-bd64-59eaaf0c571c.jpeg" alt="login" width="300">
</div>

## REQUEST from 2 APIs for gathering the NFTs + the name of their collection
<div>
  <img src="https://user-images.githubusercontent.com/53595545/167317225-7e1b7808-c404-4f03-849c-3df28fc8d5f7.jpeg" alt="dashboard" width="300">
</div>

## REQUEST from 1 API to GET the NFTs from a specific collection
<div>
  <img src="https://user-images.githubusercontent.com/53595545/167317237-81115705-833a-4595-b8bb-3bd364a28f7f.jpeg" alt="viewCollection" width="300">
</div>

## BONUS: Generate QR for coupon validation
<div>
  <img src="https://user-images.githubusercontent.com/53595545/167317238-5ab5f852-3242-4dac-99fc-a8a53ac92af5.jpeg" alt="viewNft" width="300">
  <img src="https://user-images.githubusercontent.com/53595545/167317239-2fc0c5a0-edaa-4195-a8df-11c2b89548fb.jpeg" alt="generateQR" width="300">
</div>

## Popup Animation when disconnecting walllet
<div>
  <img src="https://user-images.githubusercontent.com/53595545/167317228-4f4dbe92-02de-43ae-986f-6d5431d6db00.jpeg" alt="wallets" width="300">
  <img src="https://user-images.githubusercontent.com/53595545/167317265-193894ea-dbf3-42a7-a5f9-64ffd218f36b.jpeg" alt="deleteWallet" width="300">
</div>

## DELETE user si UPDATE email
<div>

  <img src="https://user-images.githubusercontent.com/53595545/167317231-78566a77-895d-497c-8619-6b0ae19ce67f.jpeg" alt="profile" width="300">
</div>


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
