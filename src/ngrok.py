from pyngrok import ngrok, conf, exception

def connect(token, port, region):
    account = None
    if token is None:
        token = 'None'
    else:
        if ':' in token:
            # token = authtoken:username:password
            account = token.split(':')[1] + ':' + token.split(':')[-1]
            token = token.split(':')[0]

    config = conf.PyngrokConfig(
        auth_token=token, region=region
    )
    try:
        if account is None:
            public_url = ngrok.connect(port, pyngrok_config=config, bind_tls=True).public_url
        else:
            public_url = ngrok.connect(port, pyngrok_config=config, bind_tls=True, auth=account).public_url
    except exception.PyngrokNgrokError:
        print('указан неверный токен или тебе выпал общий токен который использует другой анон, получи свежий: https://dashboard.ngrok.com/get-started/your-authtoken')
    else:
        print(f'\033[01;38;05;112m⯈\033[0m Ссылка на Hгрок: {public_url}')
