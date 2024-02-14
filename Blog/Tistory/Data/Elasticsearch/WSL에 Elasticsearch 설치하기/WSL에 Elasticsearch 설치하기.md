## WSL에 Elasticsearch 설치하기

-   회사에서 Elasticsearch 도입을 고려하고 있고, 이를 테스트하기 위해 숙지가 필요한 상황이다. 그래서 본격적으로 서버에서 사용하기 이전에 개인 PC에서 구현하여 어떤 장단점이 있는지 연구한 다음 진행하고자 한다. 개인 PC의 환경은 Windows 이기 때문에 차후 구축할 서버인 Linux 환경과 차이가 있을 것이므로 **WSL에서 ELK를 구축하고 사용**하는 법을 정리하고자 한다.
-   가장 많이 참고한 링크는 Elastic 공식 블로그의 [관계형 DB와 Elasticsearch 간의 동기화를 유지하는 방법](https://www.elastic.co/kr/blog/how-to-keep-elasticsearch-synchronized-with-a-relational-database-using-logstash)에 대한 글이다. 이 외에도 ELK를 어떻게 활용할지에 대해서는 Reference가 워낙 많기 때문에 지금은 일단 초보 개발자가 신기술을 도입하기 이전에 '설치' 하고 '이해'하는 단계로 생각하고 있다. 아직 spring과 연결까지 고려하지 않고, Elasticsearch 내부에서 장난을 쳐볼 예정이기 때문에 버전은 관계 없이 간단하게 진행해보았다. 

---

## Elasticsearch란?

공식 문서에서 설명하는 Elasticsearch는 “시간이 갈수록 증가하는 문제를 처리하는 **분산형 RESTful 검색 및 분석 엔진**입니다. Elastic Stack의 핵심 제품인 Elasticsearch는 데이터를 중앙에 저장하여 손쉽게 확장되는 광속에 가까운 빠른 검색, 정교하게 조정된 정확도, 강력한 분석을 제공합니다.”

정리하면, Elasticsearch는 Apache Lucene(아파치 루씬) 기반의 Java 오픈소스 분산 검색 엔진이다. 엘라스틱서치를 단독으로 사용하기도 하지만, 주로 ELK Stack, Elastic Stack이라는 Elasticsearch, Logstash, Kibana로 이루어진 데이터의 검색, 분석, 시각화를 도와주는 스택으로 함께 사용한다.

-   **Logstash:** 데이터를 수집하고 정제하여 Elasticsearch로 전달. 파이프라인 역할.
-   **Elasticsearch:** Logstash로부터 받은 데이터를 검색 및 분석.
-   **Kibana:** Elasticsearch의 검색과 분석을 통한 데이터의 시각화 및 스택 관리.

---

## WSL에서 ELK 설치하고 사용하기

### MySQL

MySQL의 데이터를 Logstash로 정제하여 Elasticsearch에 저장하고, 이를 검색하는 과정을 진행해볼 예정이므로 localhost에 이전 게시글을 참고하여 MySQL 등의 RDB를 설치한 다음 진행해보자.

MySQL의 데이터를 정제하여 Elasticsearch에 맞는 형태로 저장해주기 위해 Logstash를 이용한다. 그러므로, DB 쪽에 Elasticsearch 테스트를 위한 간단한 테이블을 하나 생성한다.

```
CREATE TABLE es_table (
  id BIGINT(20) UNSIGNED NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY unique_id (id),
  client_name VARCHAR(32) NOT NULL COMMENT '고객의 이름',
  modification_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '마지막 수정 시간',
  insertion_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '데이터 삽입 시간'
) COMMENT='Elasticsearch 동기화를 위한 테이블, 각 고객의 정보와 타임스탬프를 저장';
```

Logstash와 Elasticsearch 사용 테스트를 원활하게 하기 위해 특히 더 중요한 컬럼은 id이다. 일종의 PK와 같은 역할을 해주는 id 컬럼이 Elasticsearch에 적재하는 형태에서 필수적이기 때문에, RDB에서는 한 줄 한 줄의 데이터, Elasticsearch에서는 하나의 도큐멘트를 구분하기 위한 id값이 필요하다.


### WSL 설치

[이전 게시글](https://web-yiyeon.tistory.com/12)을 참고하여 WSL 설치 후에 우분투 서버를 실행한다.


### ELK 설치 전 준비 과정

시스템 패키지 최신화 및 업그레이드

```
sudo apt update && sudo apt upgrade
```

java 8 버전 설치

```
sudo apt install openjdk-8-jdk
```

설치 후 java 잘 설치되었는 지 확인

![[240207_1.png]]

```
java -version
```

⇒ 이 때, java 환경변수를 설정해줘야 할텐데 일단 나는 설정하지 않았다.

\* 아래 과정이 필요할 수도 있다.

You may need to install the apt-transport-https package on Debian before proceeding:

```
sudo apt-get install apt-transport-https
```


### Elasticsearch 설치

You can install the Elasticsearch Debian package with:

```
sudo apt-get install elasticsearch
```

정상적으로 설치되었는지 확인

```
sudo service elasticsearch **start** 
```

\>> elasticsearch라는 서비스를 실행시켜라

```
sudo service elasticsearch **status**
```

\>> elasticsearch라는 서비스의 현재 상태를 보자

\* 이 때, systemctl로 확인할 수도 있는데 별도로 설정해주지 않으면 WSL에서는 systemctl이 작동하지 않는다. 설정을 해주었다면 systemctl로 확인해도 괜찮다!

정상적으로 설치되었다면, sudo에 대한 password를 요구한 후 아래와 같이 진행될 것이다.

![[240207_2.png]]

나와 같이 WARNING이 뜨는 경우도 있을텐데 이 때는 말 그대로 ‘주의’ 정도 단계이기 때문에, 염두에 두고 작업을 이어가면 된다. (어떤 문제인지 기억은 해두자!)

status에서는 running이라고 하지만, 실제로 정상 작동을 하고 있는지 shell에서 확인해보자.

```
curl -X GET localhost:9200
```

elasticsearch는 기본적으로 port 9200에 설정되며, 위와 같이 localhost의 9200 port에 GET 접근한다는 커맨드를 입력하였을 때 정상 작동한다면 아래와 같이 elasticsearch의 버전 정보나 루씬의 버전 등에 대한 정보를 확인할 수 있다.

![[240207_3.png]]

web에서도 같은 요청을 하면, 같은 정보가 출력될 것이다.

![[240207_4.png]]


### Kibana 설치

```
sudo apt-get install kibana
```

정상적으로 설치되었는지 확인

```
sudo service kibana start
```

![[240207_5.png]]

Elasticsearch가 port 9200에서 열리듯, Kibana는 port 5601에서 열린다. [localhost:5601](http://localhost:5601) 에서 kibana 화면이 잘 실행되는지 들어가보자.

![[240207_6.png]]


### Logstash 설정

[Logstash와 JDBC를 사용해 RDBMS와 Elasticsearch의 동기화를 유지하는 방법](https://www.elastic.co/kr/blog/how-to-keep-elasticsearch-synchronized-with-a-relational-database-using-logstash)

위 참고 링크를 샘플 예제라고 설정해두겠다. 예제와 같을 필요는 없지만 MySQL에 table을 생성해두었다면, 이 테이블을 Logstash를 이용해 Elasticsearch로 연결해보자.

Elasticsearch, Kibana와 마찬가지로 logstash를 설치한다.

```
sudo apt-get install logstash
```

이 때, logstash를 실행하는 방법은 service 같은 개념이 아니기 때문에 conf 파일이 필요하다.

vim을 이용해 `logstash\_config.conf` 파일을 만들어보자.

```
vim /etc/logstash/logstash_config.conf
```

공식 문서에서 제공하는 config는 아래와 같은 형식인데, 이를 꼼꼼히 살펴보면 여러 정보가 필요함을 알 수 있다.

```
input {
  jdbc {
    jdbc_driver_library => "<path>/mysql-connector-java-8.0.16.jar"
    jdbc_driver_class => "com.mysql.jdbc.Driver"
    jdbc_connection_string => "jdbc:mysql://<MySQL host>:3306/es_db"
    jdbc_user => <my username>
    jdbc_password => <my password>
    jdbc_paging_enabled => true
    tracking_column => "unix_ts_in_secs"
    use_column_value => true
    tracking_column_type => "numeric"
    schedule => "*/5 * * * * *"
    statement => "SELECT *, UNIX_TIMESTAMP(modification_time) AS unix_ts_in_secs FROM es_table WHERE (UNIX_TIMESTAMP(modification_time) > :sql_last_value AND modification_time < NOW()) ORDER BY modification_time ASC"
  }
}
filter {
  mutate {
    copy => { "id" => "[@metadata][_id]"}
    remove_field => ["id", "@version", "unix_ts_in_secs"]
  }
}
output {
  # stdout { codec =>  "rubydebug"}
  elasticsearch {
      index => "rdbms_sync_idx"
      document_id => "%{[@metadata][_id]}"
  }
}
```

아직 초보인 입장에서 하나하나 알아가기는 벅찬 부분들이 있으니, 내가 이해한 범위 내에서 간략하게 수정하고 작업을 진행할 수 있는 항목에 대해 설명해보겠다.

-   **input**: 입력 플러그인. 어떤 데이터 소스에서 가지고 올지에 대한 설정. 위에서는 jdbc를 이용하였으나 다른 설정도 가능.
    -   mysql jdbc driver: logstash는 jdbc 드라이버를 이용해 mysql과 연결하여 데이터를 가지고온다. 그러므로, jdbc driver를 설치하고 해당 파일에 대한 경로와 정보를 작성해주어야 한다.
    -   mysql 정보: jdbc connection을 이용할 예정이니, jdbc - mysql 드라이버 사용 시의 db url 정보를 작성해준다. 또한, 이 때 접근할 DB의 user 이름과 비밀번호도 필요하다.
    -   schedule: 실행 빈도. 위 설정은 매 5초마다 실행하겠다는 뜻.
    -   statement: 실행하고자 하는 SQL 쿼리. `:sql_last_value`는 logstash가 마지막으로 실행한 값.
-   **filter**: 필터 플러그인. 가져온 데이터에 대한 변환을 수행하고, 이를 설정. 위에서는 mutate 필터를 통해 값을 복사하고 제거하도록 설정해둠.
-   **output**: 출력 플러그인. 가지고 와서 변환된 데이터를 어떻게 elasticsearch에 저장할지 설정.
    -   index: 데이터를 저장할 인덱스 이름 지정. 즉, RDB에서는 테이블과 같은 개념. elasticsearch의 index명이 된다.
    -   document\_id: elasticsearch 내부에서 개별 도큐멘트의 id(고유 식별자) 지정.

위를 기반으로 설정을 작성했다면 저장해준다. vim으로 실행했으니, esc를 누르고 :wq! 또는 :w , :q 하면 저장 후 종료가 된다. ([vim 작성법](https://wiki.kldp.org/KoreanDoc/html/Vim_Guide-KLDP/Vim_Guide-KLDP.html))

마지막으로 Logstash를 실행시켜야 하는데, WSL 에서는 Logstash를 한 번에 service로 인식하지 못한다.

```
/usr/share/logstash/bin/system-install /etc/logstash/startup.options sysv
```

그래서 위와 같은 코드로 서비스를 수동으로 등록해준다. 

Logstash를 실행시킨다.

```
sudo service logstash start
```

정상적으로 실행되고 있는지 확인 

```
sudo service logstash status
```

Logstash의 로그는 /var/log/logstash 경로에 쌓인다. 

그리고 연결하고자 하는 RDB에 데이터를 insert하면 Logstash가 스케쥴에 맞게 돌아가면서 데이터를 elasticsearch로 저장해줄 것이다. 

정상적으로 처리가 되었다면, elasticsearch의 인덱스에서 직접 조회해보자.

```
curl -XGET "http://localhost:9200/rdbms_sync_idx/_search?pretty"
```

![[img.png]]


이제 logstash가 뒤에서 열심히 돌아가는 동안 새로운 데이터를 추가하면서 elasticsearch로 검색 해보고, kibana로 시각화된 결과를 확인할 수 있게 되었다. 하지만 엘라스틱서치의 **검색엔진화**는 이제부터 시작이다.


😁어떤 새로운 기술이건 [공식문서](https://www.elastic.co/guide/index.html)가 가장 중요하다! 다만, elasticsearch의 사용 범위와 사례는 많은데 모두 초보자가 접근하기엔 어려운 부분이 있어 이 글을 작성했다. 아래에 참조 링크를 많이 첨부해두었으니 로컬 PC에서 이런 저런 시도를 해보고 **나만의 것**으로 만들어보자! 


---


#### 참고 

[ElasticSearch & Kibana 설치 in WSL2](https://dschloe.github.io/settings/elasticsearch_kibana_wsl2/)

[\[ELK\] WSL을 통한 ELK 설치 및 실행](https://cow-coding.tistory.com/52)

[Elasticsearch를 검색 엔진으로 사용하기(1): Nori 한글 형태소 분석기로 검색 고도화 하기 - 하나몬](https://hanamon.kr/elasticsearch-%EA%B2%80%EC%83%89%EC%97%94%EC%A7%84-nori-%ED%98%95%ED%83%9C%EC%86%8C-%EB%B6%84%EC%84%9D%EA%B8%B0-%EA%B2%80%EC%83%89-%EA%B3%A0%EB%8F%84%ED%99%94-%EB%B0%A9%EB%B2%95/)