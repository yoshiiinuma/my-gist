# my-gists

Yet another Gist client

## Installation

```
> npm install my-gists
```

## Usage

```
> my-gists [options] list                         /* show all the user's gists */
> my-gists [options] post <File> '<DESCRIPTION>'  /* post a gist */
> my-gists [options] delete <GIST-ID>             /* delete a gist specified by id */
```

options

```
-h, --help            : Show this usage
-u <UserName>         : Specify Gist User Name
-t <AccessTokenFile>  : Specify Personla Access Token for Gist
-c <CONFIGJSON>       : Specify Config Json File (extension must be .json, default config.json) 
```

## Config.json Format

``` json
{
  "userName":"xxxxxxx",
  "accessToken":"01234567890abcdef0123456789abcedf0123456789abcdef"
}
```

## Get your Personal Access Token

[Create you personal access token to access gist here!](https://github.com/settings/tokens)
