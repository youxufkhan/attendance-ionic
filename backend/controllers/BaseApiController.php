<?php
/**
 * Created by PhpStorm.
 * User: xuf
 * Date: 9/12/2018
 * Time: 5:53 PM
 */

namespace app\controllers;

use yii\rest\ActiveController;

class BaseApiController extends ActiveController {

    public function behaviors()
    {
        $behaviors = parent::behaviors();

        $behaviors['corsFilter'] = [
            'class' => \yii\filters\Cors::className(),
            'cors' => [
                'Access-Control-Request-Method' => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
                'Access-Control-Request-Headers' => ['*'],
                'Access-Control-Allow-Credentials' => null,
                'Access-Control-Max-Age' => 86400,
                'Access-Control-Expose-Headers' => ['X-Pagination-Page-Count', 'X-Pagination-Current-Page'],
            ],
        ];
        return $behaviors;
    }

    public function verifyMandatoryParameters($mandatoryParameters)
    {

        $data = \Yii::$app->request->post();
        foreach ($mandatoryParameters as $param) {
            if (!array_key_exists($param, $data) || !$data[$param]) {
                return false;
            }
        }
        return true;

    }

}