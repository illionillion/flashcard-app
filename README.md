# 説明

アプリ名「RAY-BOON」

例文を ChatGPT の API キーを使用して生成できる単語帳アプリ

# Google Play Store

https://play.google.com/store/apps/details?id=com.rayboon

# Canva

https://www.canva.com/design/DAFkZTCS_hw/PTxL2zHqkzewD535AFJS2w/view?utm_content=DAFkZTCS_hw&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink

# システム構成

```mermaid

flowchart LR

OU[User]

subgraph mobile[モバイルアプリ]
    useTech1{{"React Native"}}
end

subgraph api[WebAPIサーバー]

    subgraph infrastructure[Vercel]

        useTech2{{"Express"}}

    end

end

subgraph openai[ChatGPT]

end

OU <--> mobile
mobile <--> api
api <--> openai

```
