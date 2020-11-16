/**
 * Created by ictte on 09/11/2020.
 */
const {makeDir,writeFile}=require('../../file-system/models/fsmModel');
const writeFileController=function (request,response,next) {
    const _user_id=request.body.id ? request.body.id:request.params.id;
    try {
        const path= process.cwd()+'/file-system/folders';
        const dir= makeDir(path,_user_id);
        if(dir){
            try {
                const write= writeFile(path+'/'+_user_id+'/','r+',request.body.fileName,request.body.data);
                response.status(201).json(write)
            }catch (e){
                console.log(e)
                response.status(400).json(e)
            }
        }else {
             try {
                 const write=writeFile(path+'/'+_user_id+'/','r+',request.body.fileName,request.body.data);
                 response.status(201).json(write)
             }catch (e){
                 console.log(e)
                 response.status(400).json(e)
             }
        }
    }catch (e){
        console.log("Joke ",e);
    }
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
    writeFileController,
    readFile,
    deleteFile,
    makeDir,
    deleteDir,
    getFileStat,
    updateFile,
};
