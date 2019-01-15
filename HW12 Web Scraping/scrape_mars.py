#!/usr/bin/env python
# coding: utf-8

# Dependencies
from bs4 import BeautifulSoup
from splinter import Browser
import pandas as pd
import requests
from selenium import webdriver
import time
import re
import html5lib
from sys import platform

#setup browser connection & visit NASA site
def init_browser():
        executable_path = {'executable_path': '/app/.chromedriver/bin/chromedriver'}
        return Browser('chrome', headless=True, **executable_path)

data_scr = {}
def scrape():
    try:
        browser = init_browser()
        url = 'https://mars.nasa.gov/news/'
        browser.visit(url)
        url = browser.html
        soup = BeautifulSoup(html, 'html.parser')

# Retrieve the latest element that contains news title and news_paragraph
        mars_title = soup.find('div', class_='content_title').find('a').text
        mars_para = soup.find('div', class_='article_teaser_body').text

# Display scrapped data from NASA site
        data_scr["data1"]= mars_title
        data_scr["data2"] = mars_para
    
        return data_scr

def scrape2():
    
    try:
        browser = init_browser()
        j_url = 'https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars'
        browser.visit(j_url)
        html_image = browser.html
        soup = BeautifulSoup(html_image, 'html.parser')
        browser.click_link_by_partial_text('FULL IMAGE')
        time.sleep(2)
        browser.click_link_by_partial_text('more info')
        time.sleep(2)
        browser.click_link_by_partial_text('.jpg')


#Put together url links 
        featured_img_url = soup.find('img').get('src')
        data_scr["image"] = featured_img_url
        return data_scr
finally:

        browser.quit() 

def marsscr_weather():

    try: 
        browser = init_browser()
        w_url = 'https://twitter.com/marswxreport?lang=en'
        html = requests.get(w_url)
        soup = BeautifulSoup(html.text, 'html.parser')
        mars_weather = soup.find_all(string=re.compile("Sol"), class_ = "TweetTextSize TweetTextSize--normal js-tweet-text tweet-text")[0].text
        data_scr["weather"] = mars_weather
        
        return data_scr

    
#Mars Facts
def mars_facts():
    try:
        
        url = 'http://space-facts.com/mars/'
        table_df = pd.read_html(url)[0]
        table_df = table_df.rename(columns={0:'Mars Planet Profile', 1:''})
        table_df = table_df.set_index('Mars Planet Profile', drop=True)
        data_scr["data table"] = table_df.to_html()
        return data_scr
    
# Visit hemispheres website through splinter module 
def mars_hemi():
    try:
        browser = init_browser()
# executable_path = {"executable_path": "chromedriver"}
# browser = Browser("chrome", **executable_path, headless=True)
        base_url = 'https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars'
        browser.visit(base_url)

        html = browser.html
        soup = BeautifulSoup(html, 'html.parser')


# Retreive all items that contain mars hemispheres information
        elements = soup.find_all('div', class_='item')

# Create empty list for hemisphere urls 
        hemimage_urls = []
        hemi_url = 'https://astrogeology.usgs.gov'

# Loop through the items previously stored
        for i in elements: 
    # Store title
            title = i.find('h3').text

            browser.click_link_by_partial_text(t)
            hem_url = browser.find_link_by_partial_href('download')['href']
            hem_dict = {'title': title, 'img_url': hem_url}
            hem_img_urls.append(hem_dict)
            browser.back()
    

# Display hemisphere_image_urls
        data_scr["hemispheres"] = hemimage_urls
        return data_scr
# In[ ]:




