package com.practice;

import java.util.Scanner;

public class NumberToWord {
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		System.out.println("Enter your number :");
		String numberString = sc.next();
		sc.close();
		StringBuilder sb = new StringBuilder(numberString);
		numberString = sb.reverse().toString();
		char nums[] = numberString.toCharArray();
		for (int i = nums.length - 1; i >= 0; i--) {
			if ((i == 1 || i == 4 || i == 7) && nums[i] == '1') {
				System.out.print((nums[i - 1] == '1' ? "eleven "
						: nums[i - 1] == '2' ? "twelve "
								: nums[i - 1] == '3' ? "thirteen "
										: nums[i - 1] == '4' ? "fourteen "
												: nums[i - 1] == '5' ? "fifteen "
														: nums[i - 1] == '6' ? "sixteen "
																: nums[i - 1] == '7' ? "seventeen "
																		: nums[i - 1] == '8' ? "eighteen "
																				: nums[i - 1] == '9' ? "ninteen " : "")
						+ ((i == 4) ? "thousand " : "") + ((i == 7) ? "million" : ""));
				i--;
			} else {
				System.out.print(getWord(nums[i], i));
			}
		}
	}

	private static String getWord(char n, int position) {
		position++;
		if (position == 1 || position == 4 || position == 7) {
			return ((n == '1') ? "one "
					: (n == '2') ? "two "
							: (n == '3') ? "three "
									: (n == '4') ? "four "
											: (n == '5') ? "five "
													: (n == '6') ? "six "
															: (n == '7') ? "seven "
																	: (n == '8') ? "eight " : (n == '9') ? "nine " : "")
					+ ((position == 4) ? "thousand " : "") + ((position == 7) ? "million " : "");
		}
		if (position == 2 || position == 5 || position == 8) {
			return (n == '1') ? ""
					: (n == '2') ? "twenty "
							: (n == '3') ? "thirty "
									: (n == '4') ? "fourty "
											: (n == '5') ? "fifty "
													: (n == '6') ? "sixty "
															: (n == '7') ? "seventy "
																	: (n == '8') ? "eighty "
																			: (n == '9') ? "ninty " : "";
		}
		if (position == 3 || position == 6 || position == 9) {
			return (n == '1') ? "one hundred and "
					: (n == '2') ? "two hundred and "
							: (n == '3') ? "three hundred and "
									: (n == '4') ? "four hundred and "
											: (n == '5') ? "five hundred and "
													: (n == '6') ? "six hundred and "
															: (n == '7') ? "seven hundred and "
																	: (n == '8') ? "eight hundred and "
																			: (n == '9') ? "nine hundred and " : "";
		}
		return "none";
	}
}
