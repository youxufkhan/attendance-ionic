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
use yii\web\UnauthorizedHttpException;

class UserController extends BaseApiController {
    public $modelClass = 'app\models\Users';

    public function actions() {
        $actions = parent::actions();
        unset($actions['create']);
        return $actions;
    }

    public function actionCreate(){
        echo 'here';die;
        $data = \Yii::$app->request->post();
        if(!$this->verifyMandatoryParameters(['password','username', 'name'])){
            throw new Exception('Invalid Parameters');
        }
        $user = User::findByUsername($data['username']);
        if($user){
            throw new Exception('Username already exists');
        }
        $user = new Users();
        $user->load($data,"");
        $user->password = Yii::$app->security->generatePasswordHash($data['password']);
        if(!$user->save()){
            throw new Exception('Database Exception',1003,new Exception(json_encode($user->errors),1003));
        }

    }

    public function actionLogin(){
        $data = \Yii::$app->request->post();
        if(!$this->verifyMandatoryParameters(['email','password'])){
            throw new Exception('Invalid Parameters');
        }
        $user = Users::findByUsername($data['username']);
        if(!$user){
            throw new Exception('Invalid Parameters');
        }
        if($user->validatePassword($data['password'])){
            return $user;
        } else {
            throw new UnauthorizedHttpException();
        }

    }


}