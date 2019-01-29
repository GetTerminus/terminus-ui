FROM circleci/node:10.0.0

USER root

RUN apt-get update && \
apt-get install -y python-pip python-dev && \
pip install awscli

USER circleci
