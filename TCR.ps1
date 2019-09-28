while(True)
{
    yarn test && git commit -am "working" ||  git rebase 
}

while(true); 
do 
    git pull --rebase; 
    git push; 
done; 