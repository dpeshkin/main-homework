
set -e
zip -r build.zip build

curl -H "Content-type: application/zip" \
     -H "Authorization: Bearer $NETLIFY_KEY" \
     --data-binary "@build.zip" \
     http://api.netlify.com/api/v1/sites/practical-curie-1328b1.netlify.com/deploys