/**
 * Created by ictte on 09/11/2020.
 */
const fs=require('fs');

let response=function(error,data){
   return {error,data}
};
const buffers=new Buffer.alloc(1024);
const writeFile=function (path,flag,fileName,flavorData) {
    var x=[]
   fs.readFile(process.cwd()+'/file-system/folders/CV-DanAyettey_drift_Network.pdf',(err,data)=> {
       x.push(err);
       x.push(data)
        if (err) {
            return err;
        } else {
        const buffer = new Buffer.from(data);
        fs.open(path + fileName, flag, response);
        if (response.error) {
            return response.error;
        } else {
            fs.writeFile(path + fileName, buffer, 'binary', response);
            if (response.error) {
                return response.error;
            } else {
                return response.data;
            }
        }
    }
    });

  console.log(x)
};

const getFileStat=function (path) {
    fs.open(path,r,function (error,data) {
        if(error){
            return error
        }else {
            fs.stat(data, function (error, stat) {
                if (error) {
                    return error.message
                } else {
                    return stat

                }

            })
        }
    })


};
const readFile=function (path) {
    fs.open(path,'r+',function (error,data) {
        if (error) {
            return error
        } else {
            fs.readFile(data, buffers, buffers.length, 0, function (err, bytes) {
                if (err) {
                    return err.message
                } else {

                    fs.close(data, function () {
                        return bytes;
                    });

                }
            })
        }
    })
};

const deleteFile=function (path) {
    fs.open(path,r,function (err,data) {
        if(err){
            return err.message
        }else {

           fs.unlink(data,function (error) {

               if(error){
                   return error.message
               }else {
                   return data;
               }

           })

        }
    })
};
const updateFile=function (path) {
    fs.open(path,'r+',function (err,data) {
        if(err){
            return err.message
        }else {
            return data;
        }
    })
};

const makeDir=function (path,name) {
    fs.readdir(path, function (error, dir) {
        if (error) {
            return error.message
        } else {
            fs.mkdir(path+'/'+name, function (err, file) {
                if (err) {
                    return err.message
                } else {
                    return file;
                }

            })
        }



    });
};

const deleteDir=function (path) {
    fs.readdir(path,function (error,dir) {
        fs.rmdir(dir,function (err) {
            if(err){
                return err.message
            }else {
                return dir;
            }
        })
    });
};

module.exports={
    writeFile,
    readFile,
    deleteFile,
    makeDir,
    deleteDir,
    getFileStat,
    updateFile,
};
