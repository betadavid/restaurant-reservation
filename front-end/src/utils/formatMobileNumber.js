/**
 * Format a mobile number in xxx-xxx-xxxx format (which is the format for mobile number in the data base)
 * @param mobileNumber
 *  regex [0-9]{10} mobile number
 * @returns {*}
 *  the mobile number string formatted as xxx-xxx-xxxx
 */

function formatMobileNumber(mobileNumber){
  mobileNumber = mobileNumber.replaceAll("-","");
  return mobileNumber.slice(0,3) + "-" + mobileNumber.slice(3,6) + "-" + mobileNumber.slice(6)
}

export default formatMobileNumber;