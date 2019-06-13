FROM circleci/node:11.2

USER root

RUN apt-get update

RUN apt-get install -y python-pip

RUN apt-get install -y python2.7-dev

RUN pip install awscli

USER circleci
