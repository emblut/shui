# Individuell examination - Shui

## Instruktioner
Du ska bygga en enkel anslagstavla där det går att posta meddelanden. Det ska gå och se alla meddelanden samt posta ett nytt meddelande där man anger ett användarnamn. Se längre ner vad ett meddelande ska innehålla.
Du ska bygga både en frontend i React (annat ramverk är godkänt med) och ett serverless API i AWS. Din frontend ska vara "hostad" i en S3 - bucket på AWS och du ska använda dig av ditt API i dina API-anrop.


## Funktionella krav

**Krav:**
* Det går att posta ett nytt meddelande.
* Det går att ändra ett valfritt postat meddelande och det ska inte gå att kunna ändra ett meddelande som inte finns. Denna kontroll av att ett meddelande finns ska ske i backend.
* Det går att se alla meddelanden.

## Tekniska krav

**Frontend**

* Byggt med ett ramverk (förslagvis React)
* Driftsatt på AWS i en S3 bucket och nåbar via URL
* Gör fetch-anrop mot ditt serverless api och använder dig av alla endpoints som du har byggt

**Backend**

* Serverless framework
* API Gateway
* Lambda
* DynamoDB

**Meddelande**

Ett meddelande har följande egenskaper: `id`, `username`, `text`, `createdAt`.

## Figmaskiss

Er inlämning behöver inte se ut exakt som skissen nedan utan kan användas mer som en referens på hur det ska fungera.

https://www.figma.com/file/QKiz47a00tMsrPBIHsznR6/Shui---React?type=design&node-id=0-1&t=QBELxGIdjEESvy3Q-0

## Betygskriterier

**För Godkänt:**
* Uppfyller alla funktionella och tekniska krav
* Hela webbplatsen ska fungera utan några fel i utvecklarkonsolen i webbläsaren (ex. CORS)

**För Väl Godkänt:**
* Det går att sortera alla meddelanden på datum
* Det går att hämta alla meddelanden från alla användare men också från en specifik användare (detta ska vara gjort i backend d.v.s. själva hämtningen av meddelanden från en specifik användare och returneras till frontend, det är alltså inte tillåtet med en filtrering enbart i frontend)

## Inlämning

Inlämning sker på Azomo med en länk till ditt Github repo med din kod senast **3/10 kl 23:59**. Glöm inte att skicka med URL:en till din webbapplikation som en kommentar till inlämningen i Azomo.
