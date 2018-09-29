<?php
/**
 * Created by PhpStorm.
 * User: xuf
 * Date: 9/12/2018
 * Time: 5:45 PM
 */

namespace app\controllers;

use app\models\User;
use app\models\Users;
use yii\db\Exception;
use yii\web\UnauthorizedHttpException;

class UserController extends BaseApiController {
    public $modelClass = 'app\models\Users';

    public function actions() {
        $actions = parent::actions();
        unset($actions['create']);
        return $actions;
    }

    public function actionCreate(){
        $data = \Yii::$app->request->post();
        if(!$this->verifyMandatoryParameters(['password','username', 'name'])){
            throw new \Exception('Invalid Parameters');
        }
        $user = Users::findByUsername($data['username']);
        if($user){
            throw new \Exception('Username already exists');
        }
        $user = new Users();
        $user->load($data,"");
        $user_count = Users::find()->count();
        if($user_count == 0){
            $user->type = 2; // Type 2 is admin i.e employer
            $user->approved = 1;
        }else{
            $user->type = 1; //Type 1 is normal user i.e employee
            $user->approved = 0;
        }
        $user->password = \Yii::$app->security->generatePasswordHash($data['password']);
        if(!$user->save()){
            throw new \Exception('Database Exception');
        }
    }

    public function actionLogin(){
        $data = \Yii::$app->request->post();
        if(!$this->verifyMandatoryParameters(['username','password'])){
            throw new Exception('Required parameters missing', null, 1022);

        }
        $user = Users::findByUsername($data['username']);
        if(!$user){
            throw new \Exception('User does not exist');
        }
        if($user->validatePassword($data['password'])){
            return $user->splicePassword();
        } else {
            throw new \Exception("Wrong Username or Password");
        }

    }



    public function actionApprove($user_id){
        $user = Users::findOne($user_id);
        if(!$user){
            throw new \Exception("No such User");
        }
        return $user->approve();
    }

    public function actionDisapprove($user_id){
        $user = Users::findOne($user_id);
        if(!$user){
            throw new \Exception("No such User");
        }
        return $user->disapprove();
    }


}