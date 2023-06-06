# Dump parser for famous person Airbnb pet project

## Usages

#### Pre-requirements

Ensure the following data exist:

* File [worldcities.csv](dump%2Fworldcities.csv) should exist/downloaded to assets folder
* Appropriate wiki dump parts should be downloaded

#### Envs

The following envs should be set:
```
ELASTICSEARCH_HOST
ELASTICSEARCH_USERNAME
ELASTICSEARCH_PASSWORD
```

### Basic usage
```sh
python3.9 src/main.py \
      --dump-file dumpFilePart1,dumpFilePart2 \
      --category-to-parse category
```

### Examples

#### Parse famous persons

```sh
make parse-famous-persons dump-file=dumpFilePart1,dumpFilePart2
```