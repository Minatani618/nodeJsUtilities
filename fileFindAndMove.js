//説明
//指定したフォルダ内のすべてのサブファイルを探索して特定の拡張子のファイルを別の場所に移す

// 以下を使用時に編集して実行する
const basePath ="\\\\ms\\blackHDD\\100_旧デバイス旧メディアのデータ\\90_オトンのデータ\\EPSON\\PM4000PX\\PM4000PX" //フォルダループの起点になるパス
const destinationPath ="\\\\ms\\blackHDD\\100_旧デバイス旧メディアのデータ\\pdfs" //ファイルの移動先フォルダ
const targetExtName=".pdf" //移動する拡張子の
//

const fs = require("fs")
const path = require("path")
let fileCount =0 //ファイルのカウント(移動先ファイルの名前かぶりを防止するためファイル名の頭につける)

//再帰的に呼び出してフォルダループする
const readChildDir=(parentDirpath)=>{
    const childDirs= fs.readdirSync(parentDirpath)
    for(targetDirName of childDirs){
        const targetDir= path.join(parentDirpath,targetDirName)
        const stat= fs.statSync(targetDir)
        fileCount+=1
        
        //サムネイルファイルを消すやつ
        /* if(targetDirName=="Thumbs.db"){
            fs.rmSync(targetDir)
            console.log(targetDir)
        } */
        
        //指定した拡張子のものを移動する
        if(path.extname(targetDir)==targetExtName){
            const renamePath = path.join(destinationPath,`${fileCount}_${targetDirName}`)
            fs.renameSync(targetDir,renamePath)
            console.log("moved: " + targetDir)
        }

        //再帰呼び出し
        if(stat.isDirectory()){
            readChildDir(targetDir)
        }
    }
}

readChildDir(basePath)