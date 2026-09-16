export const myStructure = (S: any) =>
  S.list()
    .title('Pages')
    .items([
      S.listItem()
        .title('Sahi Brand')
        .child(S.document().schemaType('page').documentId('sahi_tea')),
      S.listItem()
        .title('Charcha Brand')
        .child(S.document().schemaType('page').documentId('charcha_tea')),
      S.listItem()
        .title('Power Brand')
        .child(S.document().schemaType('page').documentId('power_tea')),
      S.divider(),

      S.listItem()
        .title('Site Config')
        .child(S.document().schemaType('config').title('Site Config')),
      S.listItem().title('About').child(S.document().schemaType('about').title('About')),
      S.listItem().title('Contact').child(S.document().schemaType('contact').title('Contact')),
    ])
