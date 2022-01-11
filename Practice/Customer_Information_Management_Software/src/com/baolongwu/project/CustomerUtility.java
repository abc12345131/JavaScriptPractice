package com.baolongwu.project;

import java.util.*;

/**
 * @author abc12345131
 * @create 2021/12/25-23:13
 */
public class CustomerUtility {

     //Encapsulating different functions as methods
    private static Scanner scanner = new Scanner(System.in);
    /**
     Used for interface menu selection. This method reads the keyboard,
     and if the user types any character in '1'-'5', the method returns.
     The return value is the character typed by the user.
     */
    public static char readMenuSelection() {
        char c;
        for (; ; ) {
            String str = readKeyBoard(1, false);
            c = str.charAt(0);
            if (c != '1' && c != '2' &&
                    c != '3' && c != '4' && c != '5') {
                System.out.print("Selection error, please re-enter: ");
            } else break;
        }
        return c;
    }
    /**
     Read a character from the keyboard and use it as the return value of the method.
     */
    public static char readChar() {
        String str = readKeyBoard(1, false);
        return str.charAt(0);
    }
    /**
     Read a character from the keyboard and use it as the return value of the method.
     If the user does not enter a character and press Enter,
     the method will use defaultValue as the return value.
     */
    public static char readChar(char defaultValue) {
        String str = readKeyBoard(1, true);
        return (str.length() == 0) ? defaultValue : str.charAt(0);
    }
    /**
     Read an integer with a length of no more than 2 digits from the keyboard
     and use it as the return value of the method.
     */
    public static int readInt() {
        int n;
        for (; ; ) {
            String str = readKeyBoard(2, false);
            try {
                n = Integer.parseInt(str);
                break;
            } catch (NumberFormatException e) {
                System.out.print("Number input error, please re-enter: ");
            }
        }
        return n;
    }
    /**
     Read an integer with a length of no more than 2 digits from the keyboard
     and use it as the return value of the method.
     If the user does not enter a character and press Enter,
     the method will use defaultValue as the return value.
     */
    public static int readInt(int defaultValue) {
        int n;
        for (; ; ) {
            String str = readKeyBoard(2, true);
            if (str.equals("")) {
                return defaultValue;
            }

            try {
                n = Integer.parseInt(str);
                break;
            } catch (NumberFormatException e) {
                System.out.print("Number input error, please re-enter: ");
            }
        }
        return n;
    }
    /**
     Read a character string whose length does not exceed limit from the keyboard
     and use it as the return value of the method.
     */
    public static String readString(int limit) {
        return readKeyBoard(limit, false);
    }
    /**
     Read a character string whose length does not exceed limit from the keyboard
     and use it as the return value of the method.
     If the user does not enter a character and press Enter,
     the method will use defaultValue as the return value.
     */
    public static String readString(int limit, String defaultValue) {
        String str = readKeyBoard(limit, true);
        return str.equals("")? defaultValue : str;
    }
    /**
     Used to confirm the selected input.
     This method reads ‘Y’ or ‘N’ from the keyboard and uses it as the return value of the method.
     */
    public static char readConfirmSelection() {
        char c;
        for (; ; ) {
            String str = readKeyBoard(1, false).toUpperCase();
            c = str.charAt(0);
            if (c == 'Y' || c == 'N') {
                break;
            } else {
                System.out.print("Selection error, please re-enter: ");
            }
        }
        return c;
    }

    private static String readKeyBoard(int limit, boolean blankReturn) {
        String line = "";

        while (scanner.hasNextLine()) {
            line = scanner.nextLine();
            if (line.length() == 0) {
                if (blankReturn) return line;
                else continue;
            }

            if (line.length() < 1 || line.length() > limit) {
                System.out.print("Input length (not greater than" + limit + ") Error, please re-enter: ");
                continue;
            }
            break;
        }

        return line;
    }
}
