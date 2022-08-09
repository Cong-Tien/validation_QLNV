function checkEmpty(value,selector,name)
{
    if(value === '')
    {
        document.querySelector(selector).innerHTML = name + " không được bỏ trống";
        document.querySelector(selector).style.display = "block";
        return false;
    }
    document.querySelector(selector).innerHTML = '';
    return true;
}

function checkLetter(value,selector,name)
{
    var regex = /^[A-Za-z]+$/;
   if( regex.test(value))
   {
     document.querySelector(selector).innerHTML = '';
     return true;
   }
   document.querySelector(selector).innerHTML = name + ' tất cả phải là ký tự';
   return false;
}

function checkNumber(value,selector,name)
{
    var regex = /^[0-9]+$/;
   if( regex.test(value) )
   {
     document.querySelector(selector).innerHTML = '';
     return true;
   }
   document.querySelector(selector).innerHTML = name + ' tất cả phải là số';
   return false;
}

function checkEmail(value,selector,name)
{
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\ [[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   if( regex.test(value))
   {
     document.querySelector(selector).innerHTML = '';
     return true;
   }
   document.querySelector(selector).innerHTML = name + ' phải đúng định dạng ! vd: loveyou@gmail.com';
   return false;
}

function checkLength(value,selector,name,min,max)
{
    if(value.length > max || value.length <min)
    {
        document.querySelector(selector).innerHTML = name + ' từ ' + min + " đến " + max + " ký tự !";
        return false;
    }
    document.querySelector(selector).innerHTML = '';
    return true;
}

function checkValue(value,selector,name,minValue,maxValue)
{
    if(Number(value) > maxValue || Number(value) <minValue || value.trim() == "")
    {
        document.querySelector(selector).innerHTML = name + ' từ ' + minValue + " đến " + maxValue;
        return false;
    } 
    document.querySelector(selector).innerHTML = '';
    return true;
}


