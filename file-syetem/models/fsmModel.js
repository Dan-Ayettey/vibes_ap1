/**
 * Created by ictte on 09/11/2020.
 */
const fs=require('fs');
const buffers=new Buffer(1024);
const writeFile=function (path,flag,flavorData) {
  fs.open(path,flag,function (err,dataPath) {
      if(err){
          return err.message
      }else {
          fs.writeFile(dataPath,flavorData,function (error) {

          if(error){
           return error
          }else {

             fs.readFile(dataPath,function (error,data) {

               if(error){
               return error
             }else{
                   return data;
             }


             })

          }

          });

      }
  })
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

const makeDir=function (path) {
    fs.readdir(path,function (error,dir) {
        fs.mkdir(dir,function (err,file) {
            if(err){
                return err.message
            }else {
                return file;
            }
        })
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