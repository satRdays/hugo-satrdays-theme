# hugo-satrdays-theme

## About
This is a theme repository for satRday conference websites using the hugo static site generator. It is designed to be used in tandem with `hugo-agency-theme` a [theme by digitalcraftsmen](https://github.com/digitalcraftsman/hugo-agency-theme). 

## Usage

1. Install `hugo`
    * [Install Hugo](https://gohugo.io/getting-started/installing/)
2. Start a new site
    ```
    hugo new site quickstart
    ```
3. Install `hugo-agency-theme` as a submodule
    ```
    cd quickstart
    git init
    git submodule add https://github.com/digitalcraftsman/hugo-agency-theme themes/hugo-agency-theme
    ```
4. Install `hugo-satrday-theme` as a submodule
    ```
    git init
    git submodule add https://github.com/satRdays/hugo-satrdays-theme themes/hugo-satrday-theme
    ```
5. modify your sites `config.toml` to include

    ```
    theme = ["hugo-satrdays-theme", "hugo-agency-theme"]
    ```