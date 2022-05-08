from django.urls import re_path
from NFTValidationApp import views

urlpatterns = [
    re_path(r'^user$', views.userApi),
    re_path(r'^user/([0-9]+)$', views.userApi),

    re_path(r'^nft$', views.nftApi),
    re_path(r'^nft/([0-9]+)$', views.nftApi),

    re_path(r'^wallet$', views.walletApi),
    re_path(r'^wallet/([0-9]+)$', views.walletApi),


]