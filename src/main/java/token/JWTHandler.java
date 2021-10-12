package token;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.crypto.MacProvider;
import model.User;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.util.Calendar;

public class JWTHandler {
    private static Key key;
    private static final int TOKEN_EXPIRY = 2880; //2 days

    public static String generateJwtToken(User user){
        Calendar expiry = Calendar.getInstance();
        expiry.add(Calendar.MINUTE, TOKEN_EXPIRY);
        return Jwts.builder()
                .setIssuer("GiraffeDeluxe")
                .claim("user", user)
                .signWith(SignatureAlgorithm.HS512, getKey())
                .setExpiration(expiry.getTime())
                .compact();
    }

    private static Key getKey(){
        //Generate a secret key, if there is none specified in the environment - only use fixed key in development for debugging
        if (key==null) {
            if (System.getenv("JWT_SECRET_KEY")!= null && System.getenv("JWT_SECRET_KEY").equals("")) {
                String string = System.getenv("JWT_SECRET_KEY");
                key = new SecretKeySpec(string.getBytes(), 0, string.length(), "HS512");
            } else {
                key = MacProvider.generateKey(SignatureAlgorithm.HS512);
            }
        }
        return key;
    }
}
