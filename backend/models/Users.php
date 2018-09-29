<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "users".
 *
 * @property int $id
 * @property string $username
 * @property string $password
 * @property string $name
 * @property string $email
 * @property int $type
 * @property int $approved
 * @property string $created_at
 */
class Users extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'users';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['type', 'approved'], 'integer'],
            [['created_at'], 'safe'],
            [['username'], 'string', 'max' => 25],
            [['password'], 'string', 'max' => 192],
            [['name', 'email'], 'string', 'max' => 50],
            [['username'], 'unique'],
            [['email'], 'unique'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'username' => 'Username',
            'password' => 'Password',
            'name' => 'Name',
            'email' => 'Email',
            'type' => 'Type',
            'approved' => 'Approved',
            'created_at' => 'Created At',
        ];
    }

    public function validatePassword($password)
    {
        return Yii::$app->security->validatePassword($password, $this->password);
    }

    public static function findByUsername($username)
    {
        return static::find()->where('email = :username or username = :username',[':username'=>$username])->one();
    }


    public function approve(){
        $this->approved = 1;
        $this->save();
        return $this;
    }

    public function disapprove(){
        $this->approved = 0;
        $this->save();
        return $this;
    }

    public function splicePassword(){
        $this->password = null;
        return $this;
    }
}
