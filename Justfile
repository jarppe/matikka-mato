@help:
  just --list


serve:
  docker run --rm -p $(ipconfig getifaddr en0):8080:80 -v $(pwd)/docs:/usr/share/nginx/html:ro nginx


start:
  yarn start


build:
  yarn build


deploy comment: build
  git add .
  git ci -m "{{ comment }}"
  git push
