<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "attendance".
 *
 * @property int $id
 * @property int $user_id
 * @property int $time_in
 * @property int $time_out
 *
 * @property Users $user
 */
class Attendance extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'attendance';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['user_id', 'time_in', 'time_out'], 'integer'],
            [['user_id'], 'exist', 'skipOnError' => true, 'targetClass' => Users::className(), 'targetAttribute' => ['user_id' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'user_id' => 'User ID',
            'time_in' => 'Time In',
            'time_out' => 'Time Out'
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getUser()
    {
        return $this->hasOne(Users::className(), ['id' => 'user_id']);
    }

    public function timeIn($user_id){
        $this->user_id = $user_id;
        $this->time_in = time();
        $this->save();
        return $this;
    }

    public function timeOut($user_id){
        $this->user_id = $user_id;
        $this->time_out = time();
        $this->save();
        return $this;
    }




}
