import json

import requests

MESSAGING_API_ENDPOINT = "https://api.gradio.app/gradio-messaging/rus"

en = {
    "RUNNING_LOCALLY": "Ссылка на градио:",
    "RUNNING_LOCALLY_SEPARATED": "Ссылка на градио:",
    "SHARE_LINK_DISPLAY": "{}",
    "COULD_NOT_GET_SHARE_LINK": "\nПроблемы с интернетом, ссылку создать не получилось.",
    "COLAB_NO_LOCAL": "Не получилось отобразить локальный интерфейс в колабе, но ссылка создана.",
    "PUBLIC_SHARE_TRUE": "\n",
    "MODEL_PUBLICLY_AVAILABLE_URL": "Модель публична доступна: {} (немного подожди прежде чем ссылка заработает)",
    "GENERATING_PUBLIC_LINK": "Генерация публичной ссылки...:",
    "BETA_INVITE": "\nОбратная связь: https://t.me/colabSDbot",
    "COLAB_DEBUG_TRUE": "Обнаружен блокнот Colab. Эта ячейка будет работать бесконечно, чтобы вы могли видеть ошибки и вывод в консоли. "
    "Чтобы отключить, установи debug=False в launch().",
    "COLAB_DEBUG_FALSE": "Обнаружен блокнот Colab. Чтобы видеть ошибки и консольный вывод, установи debug=True в launch()",
    "COLAB_WARNING": "Примечание. Открытие инспектора кода в браузере может привести к сбою в Colab.",
    "SHARE_LINK_MESSAGE": "\nВот сейчас можно переходить по ссылкам в WebUI.\nПриятного нейро-творчества, Анон!",
    "INLINE_DISPLAY_BELOW": "Загрузка интерфейса ниже...",
    "TIPS": [
        "Вы можете добавить аутентификацию в свое приложение с помощью kwarg `auth=` в команду `launch()`; пример: `gr.Interface(...).launch(auth=('username', 'password'))`",
        "Разрешить пользователям указывать, почему они отметили ввод с помощью kwarg `flagging_options=`; пример: `gr.Interface(..., flagging_options=['too slow', 'incorrect output', 'other'])`",
        "Вы можете показать или скрыть кнопку для маркировки с помощью kwarg `allow_flagging=`; Например: gr.Interface(..., allow_flagging=False)",
        "Входы и выходы, помеченные пользователями, хранятся в каталоге пометок, указанном flagging_dir= kwarg. Вы можете просмотреть эти данные через интерфейс, установив в качестве примера = kwarg каталог пометки; Например: gr.Interface(..., examples='flagged')",
        "Вы можете добавить заголовок и описание к своему интерфейсу, используя kwargs `title=` и `description=`. kwarg `article=` можно использовать для добавления описания под интерфейсом; например gr.Interface(..., title='Мое приложение', description='Lorem ipsum'). Попробуйте использовать Markdown!",
        "Для модели классификации или регрессии установите `interpretation='default'`, чтобы увидеть, почему модель сделала прогноз.",
    ],
}

try:
    updated_messaging = requests.get(MESSAGING_API_ENDPOINT, timeout=3).json()
    en.update(updated_messaging)
except (
    requests.ConnectionError,
    requests.exceptions.ReadTimeout,
    json.decoder.JSONDecodeError,
):  # Use default messaging
    pass
