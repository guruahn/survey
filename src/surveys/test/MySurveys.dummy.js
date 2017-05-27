export const dummy = {
  'surveys':
  [
    {
      "key":"-KidQ671jYnfsuh2-5EA",
      "value":{
        "title": "대선설문입니다.",
        "query": [
          {
            "questioin": "당신은 2017 대선 투표에 참가하셨습니까?",
            "answerType": "yesOrNo",
            "order": 0
          },
          {
            "questioin": "당신의 연령대를 선택해주세요",
            "answerType": "multiple",
            "example": ["20대","30대","40대","50대","60대","70대","80대","90대"],
            "order": 0
          }
        ]
      }
    },
    {
      "key":"-KidQ671jYnf5uhS-5EA",
      "value":{
        "title": "매력에 관한 설문.",
        "query": [
          {
            "questioin": "당신은 매력적입니까?",
            "answerType": "yesOrNo",
            "order": 2
          }
        ]
      }
    },
    ,
    {
      "key":"-KidQ672jYnfsuhS-5EA",
      "value":{
        "title": "그냥 재미있는 설문.",
        "query": [
          {
            "questioin": "다음 보기 중 마음에 드는 하나만 선택해주세요.",
            "answerType": "onlyOne",
            "example": ["voce","eu","nos","eles"],
            "order": 1
          }
        ]
      }
    }
  ],
  'surveyDetail': {
    "title": "설문제목을 입력하세요.",
    "updateDatetime": "2017-05-25 23:40:17.097",
    "querys": {
      0 :
        {
          "question": "질문을 입력하세요",
          "answerType": "yesOrNo",
          "order": 0,
          'answers':{0:'yes', 1:'no'}
        }
    }
  },
  'surveyDetailQuerys':[
    "-KidQ672jYnfsuhS-5EA":{
      "question": "질문을 입력하세요",
      "answerType": "yesOrNo",
      "order": 0
    }
  ],
  'surveyDetailQuerysAnswers':[
    {
      "-KidQ672jYnfsuhS-5EA":{
        'queryKey': "-KidQ672jYnfsuhS-5EA"
        'value': 'yes',
        'order': 0
      }
    },
    {
      "-KidQ602jYnfsuhS-5EA":{
        'queryKey': "-KidQ672jYnfsuhS-5EA"
        'value': 'no',
        'order': 1
      }
    }
  ]
}
