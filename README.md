# hugo-satrdays-theme

## About
This is a theme repository for satRday conference websites using the hugo static site generator. 

## Usage

1. Install `hugo`
    * [Install Hugo](https://gohugo.io/getting-started/installing/)
2. Start a new site
    ```
    hugo new site [city][year] # such as cardiff2018
    
    cd [city][year]
    
    git init
    ```
3. Install `hugo-satrday-theme` as a submodule
    ```
    git submodule add https://github.com/satRdays/hugo-satrdays-theme themes/hugo-satrdays-theme
    ```
4. copy the `config.toml` [from this site](https://github.com/satRdays/satRday_site_template/blob/master/config.toml) into your projects root (i.e. `/cardiff2018/config.toml`)

5. copy the files in `hugo-satrdays-theme/data/projects/` into `[city][year]/data/schedule/` e.g. `/cardiff2018/data/schedule/`

6. check if the site builds
   ```
   hugo serve
   ```
   go to the port listed in the return to see your site e.g. `localhost:xxxx`, probably `localhost:1313`
   
7. modify the params in the `config.toml` 

8. If you want to make the page different in a way not accessible through the `config.toml` the best way is to copy the relevant partial from the theme (e.g. `mysite/themes/hugo-satrdays-theme/layouts/patials/clients.html`) and put it into the `layouts` on the root project folder (e.g. `mysite/layouts/patials/clients.html`, which you may need to make). This will be 'found first' when the site is generated, and so used instead.
