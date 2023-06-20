export default async function GetInfo(date,pageNum,pos_x,pos_y) {
  const respone = await fetch(`http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=%2Bmx%2BUbmbjCp9eKmvINEOAVSwr6wYRCACID7ndIjfuMzG0j5fOqxDO9ngUtO5mzJmsnygGooXEgtqGBrbVStVFQ%3D%3D&numOfRows=290&pageNo=${pageNum}&base_date=${date}&base_time=0200&dataType=JSON&nx=${pos_x}&ny=${pos_y}`);
  const result = await respone.json();

  return result;
}