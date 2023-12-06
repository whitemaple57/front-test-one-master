#!/bin/bash
echo '...begin...'
if [ $# -lt 1 ]; then
    echo $0 need a host parameter
    exit 0
fi
if [ ! -n "$2" ] ;then
   sleeptime=10
else
   sleeptime=$2
fi

echo '...refreshtime='${sleeptime}'s'
host=$1
ipfile="ip.ini"

while [ true ]; do

  runlogfile="run."`date "+%Y-%m-%d"`".log"
  reloadlogfile="reload."`date "+%Y-%m"`".log"
  #echo `date`'...read ip.ini...'>>"$runlogfile" >&1
  if [ ! -f "$ipfile" ]; then
    #touch "$ipfile"
    sh /etc/nginx/conf.d/getip.sh "$host" > "$ipfile"
  fi

  oldIpAddress=`cat ip.ini |head -n 1`
  curIpAddress=`sh /etc/nginx/conf.d/getip.sh "$host"`
  #echo `date`'...oldIpAddress='${oldIpAddress} >>"$runlogfile"
  #echo `date`'...curIpAddress='${curIpAddress} >>"$runlogfile"

  if [ "$oldIpAddress" != "$curIpAddress" ];then
     #echo '..oldIpAddress:'${oldIpAddress}'!=curIpAddress:'${curIpAddress}'.......' >>"$runlogfile"
     /usr/sbin/nginx -s reload
     #echo '...nginx -s reload....' >>"$runlogfile"
     sh /etc/nginx/conf.d/getip.sh "$host" > "$ipfile"
     echo `date`'...ipchanged..oldIpAddress:'${oldIpAddress}'!=curIpAddress:'${curIpAddress}'...nginx -s reload!' >> /etc/nginx/conf.d/"$reloadlogfile"
  fi
 
  /bin/sleep "$sleeptime"
done

echo '...end .....'
