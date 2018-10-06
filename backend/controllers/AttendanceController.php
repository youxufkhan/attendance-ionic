<?php
/**
 * Created by PhpStorm.
 * User: xuf
 * Date: 9/12/2018
 * Time: 5:45 PM
 */

namespace app\controllers;

use app\models\Attendance;
use app\models\User;
use app\models\Users;
use yii\db\Exception;
use yii\web\UnauthorizedHttpException;

class AttendanceController extends BaseApiController {
    public $modelClass = 'app\models\Attendance';

    public function actions() {
        $actions = parent::actions();
        unset($actions['create']);
        return $actions;
    }


    public function actionTimeIn($user_id){
        $att = Attendance::find()->where('user_id = :id and time_out is null',[':id'=>$user_id])->one();
        if($att){
            throw new \Exception('could not time in, Time Out First');
        }
        $time_in = new Attendance();
        return $time_in->timeIn($user_id);
    }

    public function actionTimeOut($user_id){

        $att = Attendance::find()->where('user_id = :id and time_out is null',[':id'=>$user_id])->one();
        if(!$att){
            throw new \Exception('could not time out, you need to time in first');
        }
        return $att->timeOut($user_id);
    }

    public function actionUserAttendance($user_id){
        $attendance = Attendance::find()->where('user_id = :id',[':id'=>$user_id])->all();
        return $attendance;
    }

}