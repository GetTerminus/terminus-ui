#!/bin/bash

#
# Deploy documentation and demos to S3
#
#

. ~/.bashrc

echo 'BRANCH: ' $CIRCLE_BRANCH

# Upload docs
aws s3 sync docs s3://uilibrary-docs.terminus.ninja/${CIRCLE_BRANCH}/ --delete --dryrun


# Upload demos
# TODO
# TODO
# TODO
