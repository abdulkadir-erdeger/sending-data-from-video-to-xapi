# Video SCORM Render Projesi

Bu proje, kullanıcıların video dosyalarını seçip SCORM formatında bir zip dosyası olarak dışa aktarmalarına olanak tanır.

## Dosya Yapısı

- `index.html`: HTML yapısı ve video dosyası seçimi ile render butonu.
- `README.md`: Proje açıklaması ve kullanım talimatları.

## Kullanım

1. Tarayıcınızda `index.html` dosyasını açın.
2. Video dosyasını yükleyin ve "SCORM'a Çevir" butonuna tıklayın.
3. Oluşan SCORM zip dosyası otomatik olarak indirilecektir.

## SCORM URL Parametreleri

SCORM içeriklerinin doğru bir şekilde izlenmesi ve takip edilmesi için URL'ye eklenmesi gereken bazı query string parametreleri vardır. Bu parametreler, içeriğin LRS (Learning Record Store) ve LMS (Learning Management System) ile doğru bir şekilde entegre olmasını sağlar. Gerekli değerler şunlardır:

- `endpoint`: xAPI endpoint URL'si
- `auth`: Yetkilendirme token'ı
- `actor`: Öğrenici bilgileri
- `activity_id`: Aktivite ID'si
- `registration`: Kayıt ID'si

**Örnek URL:**

```
http://my.lms.com/TCActivityProvider/index_lms.html ?endpoint=http://my.lms.com/lrs/endpoint/ &auth=Basic OjFjMGY4NTYxNzUwOGI4YWY0NjFkNzU5MWUxMzE1ZGQ1 &actor={"name": ["First Last"], "mbox": ["mailto
@mycompany.com"]} &activity_id=61XkSYC1ht2_course_id &registration=760e3480-ba55-4991-94b0-01820dbd23a2
```

URL kodlaması yapılmış hali ise aşağıdaki gibi olacaktır:

```
http://my.lms.com/TCActivityProvider/index_lms.html ?endpoint=http%3A%2F%2Fmy.lms.com%2Flrs%2Fendpoint%2F &auth=Basic OjFjMGY4NTYxNzUwOGI4YWY0NjFkNzU5MWUxMzE1ZGQ1 &actor=%7B%22name%22%3A%20%5B%22First%20Last%22%5D%2C%20%22mbox%22%3A%20%5B%22mailto%3Afirstlast%40mycompany.com%22%5D%7D &activity_id=61XkSYC1ht2_course_id &registration=760e3480-ba55-4991-94b0-01820dbd23a2
```

**Not:** `activity_id` ve `registration` değerleri bazı LMS uygulamaları tarafından gerekli olabilir. Rise 360 kursları için bu değerler gerekli değildir.

Ayrıca, URL'ye özel parametreler de eklenebilir. Bu ek parametreler, içerik LMS'ye bildirim yaparken geri dönecektir.

## Geliştirici Notları

- `JSZip` kütüphanesi SCORM zip dosyasını oluşturmak için kullanılır.
- SCORM manifest dosyasının yapısını gerektiği şekilde özelleştirin.
- Projeyi geliştirmek için ek dosya ve yapılandırmaları dahil edebilirsiniz.

## Lisans

Bu proje [MIT Lisansı](https://opensource.org/licenses/MIT) altında lisanslanmıştır.
